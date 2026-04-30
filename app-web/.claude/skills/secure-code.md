# Secure Code Practices

## OWASP Top 10 Prevention

### 1. Injection (SQL, Command, NoSQL)
- Use parameterized queries (Prisma handles this)
- Never concatenate user input into queries
- Validate and sanitize all inputs
- Use prepared statements

Example (Prisma - safe):
```typescript
const user = await prisma.user.findUnique({
  where: { email: userInput }, // Safe - parameterized
});
```

### 2. Broken Authentication
- Hash passwords with bcrypt (minimum 10 rounds)
- Use secure session management
- Implement rate limiting on login attempts
- Validate sessions on every request
- Use HTTPS only

### 3. Sensitive Data Exposure
- Never log passwords or tokens
- Use environment variables for secrets
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper access controls

### 4. XML External Entities (XXE)
- Disable XML external entity processing
- Use safe XML parsers
- Validate XML input

### 5. Broken Access Control
- Check authorization on every endpoint
- Use role-based access control (RBAC)
- Verify user owns resource before modifying
- Implement principle of least privilege

Example:
```typescript
export const deleteReservation = createServerFn({ method: 'POST' })
  .handler(async ({ data, context }) => {
    const reservation = await prisma.reservation.findUnique({
      where: { id: data.id },
    });
    
    // Verify ownership
    if (reservation.userId !== context.userId) {
      throw new Error('Unauthorized');
    }
    
    return prisma.reservation.delete({ where: { id: data.id } });
  });
```

### 6. Security Misconfiguration
- Keep dependencies updated
- Use security headers (CSP, X-Frame-Options, etc.)
- Disable debug mode in production
- Use HTTPS with strong TLS
- Configure CORS properly

### 7. Cross-Site Scripting (XSS)
- React escapes content by default
- Use `dangerouslySetInnerHTML` only with sanitized content
- Validate and sanitize user input
- Use Content Security Policy (CSP)

Safe:
```typescript
<div>{userInput}</div> // Safe - React escapes
```

Unsafe:
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Dangerous!
```

### 8. Insecure Deserialization
- Validate data structure before using
- Use TypeScript for type safety
- Don't deserialize untrusted data
- Use schema validation (Zod, Yup)

### 9. Using Components with Known Vulnerabilities
- Keep dependencies updated: `bun update`
- Check for vulnerabilities: `bun audit`
- Review security advisories
- Use dependabot or similar tools

### 10. Insufficient Logging & Monitoring
- Log security events
- Monitor for suspicious activity
- Don't log sensitive data
- Implement alerting for critical events

## Input Validation

### Client-Side Validation
- Provide immediate user feedback
- Improve UX
- Not a security measure

### Server-Side Validation
- Always validate on server
- Check data types and formats
- Verify constraints (length, range, etc.)
- Reject invalid data

Example:
```typescript
export const createReservation = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!data.roomId || typeof data.roomId !== 'string') {
      throw new Error('Invalid roomId');
    }
    if (data.startTime >= data.endTime) {
      throw new Error('Invalid time range');
    }
    return data;
  })
  .handler(async ({ data }) => {
    // Process validated data
  });
```

## Authentication & Authorization

### Password Security
- Hash with bcrypt (minimum 10 rounds)
- Never store plain text passwords
- Enforce strong password requirements
- Implement password reset securely

### Session Management
- Use secure, httpOnly cookies
- Set appropriate expiration times
- Regenerate session ID after login
- Validate session on every request

### Authorization Checks
- Check user role before operations
- Verify resource ownership
- Use middleware for protected routes
- Implement principle of least privilege

## Data Protection

### Encryption
- Encrypt sensitive data at rest
- Use HTTPS for data in transit
- Use strong encryption algorithms (AES-256)
- Manage encryption keys securely

### Data Minimization
- Only collect necessary data
- Delete data when no longer needed
- Implement data retention policies
- Provide data export/deletion for users

## Environment & Secrets

### Environment Variables
- Never commit `.env` files
- Use `.env.example` for documentation
- Rotate secrets regularly
- Use different secrets per environment

### Secrets Management
- Use environment variables for secrets
- Never log secrets
- Restrict access to secrets
- Audit secret access

## Error Handling

### User-Facing Errors
- Show generic error messages
- Don't expose system details
- Log detailed errors server-side
- Provide helpful guidance

Example:
```typescript
try {
  // operation
} catch (error) {
  console.error('Detailed error:', error); // Server log
  throw new Error('Operation failed. Please try again.'); // User message
}
```

## Security Headers

### Recommended Headers
- `Content-Security-Policy`: Prevent XSS
- `X-Frame-Options`: Prevent clickjacking
- `X-Content-Type-Options`: Prevent MIME sniffing
- `Strict-Transport-Security`: Enforce HTTPS
- `Referrer-Policy`: Control referrer information

## File Upload Security

### Validation
- Validate file type (check magic bytes, not extension)
- Limit file size
- Scan for malware
- Store outside web root

### R2 Upload Pattern
```typescript
export const uploadImage = createServerFn({ method: 'POST' })
  .handler(async ({ data }) => {
    // Validate file
    if (data.file.size > 5 * 1024 * 1024) {
      throw new Error('File too large');
    }
    
    // Upload to R2
    const url = await uploadToR2(data.file);
    return { url };
  });
```

## Security Checklist

- [ ] All inputs validated server-side
- [ ] Passwords hashed with bcrypt
- [ ] Authorization checks on all endpoints
- [ ] No sensitive data in logs
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies up-to-date
- [ ] Error messages don't expose details
- [ ] Rate limiting implemented
- [ ] CORS configured properly
