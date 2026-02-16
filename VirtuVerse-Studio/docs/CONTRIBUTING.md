# Contributing to VirtuVerse Studio

Thank you for your interest in contributing to VirtuVerse Studio! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Pull Request Process](#pull-request-process)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation](#documentation)
8. [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age
- Body size
- Disability
- Ethnicity
- Gender identity and expression
- Level of experience
- Nationality
- Personal appearance
- Race
- Religion
- Sexual identity and orientation

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behaviors include:**
- Harassment or discrimination of any kind
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could be considered inappropriate

### Enforcement

Instances of unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before you start contributing, ensure you have:

1. **A GitHub account**
2. **Git installed** on your local machine
3. **Node.js v14+** installed
4. **Basic knowledge** of JavaScript, React, and Node.js
5. **Read the documentation**:
   - [README.md](../README.md)
   - [DEVELOPMENT.md](./DEVELOPMENT.md)
   - [ARCHITECTURE.md](./ARCHITECTURE.md)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
```bash
git clone https://github.com/YOUR-USERNAME/virtuverse.git
cd virtuverse/VirtuVerse-Studio
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/kushalkoppa/virtuverse.git
```

4. **Install dependencies**:
```bash
npm install
cd frontend && npm install && cd ..
```

5. **Set up environment**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

6. **Initialize database**:
```bash
npm run init-admin
```

7. **Start development server**:
```bash
npm run dev
```

## Development Process

### Finding Work

1. **Check Issues**: Look for issues labeled:
   - `good first issue` - Great for first-time contributors
   - `help wanted` - Community contributions welcome
   - `bug` - Bug fixes needed
   - `enhancement` - Feature requests

2. **Create an Issue**: If you have an idea:
   - Search existing issues first
   - Create a new issue with clear description
   - Wait for maintainer feedback before starting work

3. **Claim an Issue**: Comment on the issue saying you'd like to work on it

### Branching Strategy

1. **Keep your fork synchronized**:
```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

2. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

### Making Changes

1. **Write clean code** following our [Coding Standards](#coding-standards)

2. **Commit frequently** with clear messages:
```bash
git add .
git commit -m "feat: add user profile update functionality"
```

3. **Keep commits atomic** - One logical change per commit

4. **Write tests** for new functionality

5. **Update documentation** if needed

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build process or auxiliary tool changes

**Examples:**

```bash
# Feature
git commit -m "feat(auth): add two-factor authentication support"

# Bug fix
git commit -m "fix(api): handle null values in user profile"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body and footer
git commit -m "feat(auth): add password reset functionality

Add password reset flow with email token
Support for custom email templates

Closes #123"
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**:
```bash
npm test
```

2. **Run linting**:
```bash
npm run lint
```

3. **Check code formatting**:
```bash
npm run format
```

4. **Update documentation** if needed

5. **Rebase on latest main**:
```bash
git fetch upstream
git rebase upstream/main
```

### Submitting a Pull Request

1. **Push your branch**:
```bash
git push origin feature/your-feature-name
```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template** with:
   - Clear title
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - Testing instructions

4. **Request review** from maintainers

### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran and how to reproduce them.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged
```

### Review Process

1. **Address feedback** from reviewers
2. **Make requested changes** in new commits
3. **Push updates** to your branch
4. **Request re-review** when ready
5. **Squash commits** if requested before merge

## Coding Standards

### JavaScript Style Guide

**General Rules:**
- Use ES6+ features
- Prefer `const` over `let`, never `var`
- Use meaningful variable names
- Keep functions small and focused
- Write self-documenting code
- Add comments for complex logic

**Formatting:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Line length max 100 characters
- Trailing commas in multi-line objects/arrays

**Example:**

```javascript
// Good
const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return {
    id: user.id,
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

// Bad
var get_user = function(id) {
    var user = User.findById(id)
    return user
}
```

### React Best Practices

1. **Use functional components** with hooks
2. **Keep components small** (< 300 lines)
3. **Extract reusable logic** to custom hooks
4. **Use prop-types** for type checking
5. **Avoid inline functions** in JSX
6. **Use React.memo** for expensive renders

**Example:**

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getProfile(userId);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;
  
  return (
    <div className="user-profile">
      <h2>{profile.fullName}</h2>
      <p>{profile.email}</p>
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default React.memo(UserProfile);
```

## Testing Guidelines

### Writing Tests

1. **Test files** should be named `*.test.js`
2. **Place tests** next to the code they test
3. **Use descriptive test names**
4. **Follow AAA pattern**: Arrange, Act, Assert

**Example:**

```javascript
describe('UserService', () => {
  describe('getUserProfile', () => {
    it('should return user profile for valid user ID', async () => {
      // Arrange
      const userId = 1;
      const expectedProfile = { 
        id: 1, 
        email: 'test@example.com' 
      };
      
      // Act
      const profile = await UserService.getUserProfile(userId);
      
      // Assert
      expect(profile).toEqual(expectedProfile);
      expect(profile.id).toBe(userId);
    });
    
    it('should throw error for invalid user ID', async () => {
      // Arrange
      const invalidUserId = -1;
      
      // Act & Assert
      await expect(
        UserService.getUserProfile(invalidUserId)
      ).rejects.toThrow('User not found');
    });
  });
});
```

### Test Coverage

- **Aim for 80%+ code coverage**
- **Test edge cases** and error paths
- **Mock external dependencies**
- **Don't test third-party code**

## Documentation

### When to Update Documentation

Update documentation when you:
- Add new features
- Change existing functionality
- Add new API endpoints
- Change configuration
- Fix bugs that affect usage

### Documentation Types

1. **Code Comments**: For complex logic
2. **JSDoc**: For functions and classes
3. **README**: For project overview
4. **API Docs**: For API endpoints
5. **User Guide**: For end-user features

### Writing Good Documentation

**Do:**
- Be clear and concise
- Use examples
- Keep it up-to-date
- Use proper formatting
- Include code samples

**Don't:**
- State the obvious
- Use jargon without explanation
- Leave outdated documentation
- Forget edge cases

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Email**: For sensitive matters

### Recognition

Contributors will be recognized:
- In the project README
- In release notes
- On the project website

### Types of Contributions

We welcome all contributions:
- **Code**: Features, bug fixes, refactoring
- **Documentation**: Guides, API docs, examples
- **Testing**: Writing tests, reporting bugs
- **Design**: UI/UX improvements
- **Translation**: Internationalization
- **Community**: Helping others, triaging issues

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Reach out to maintainers
- Check existing documentation

---

**Thank you for contributing to VirtuVerse Studio!**

**Last Updated**: December 2024  
**Version**: 1.0.0
