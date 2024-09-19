# Job Posting API Endpoints
### 1. POST <mark>/api/posts</mark>
**Description:** Allows authenticated recruiters to create a new job posting.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>

### 2. GET /api/posts
**Description:** Retrieves a list of job postings with optional pagination and filters.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>
  
**Query Parameters:**
  - <mark>?page=</mark> (integer) – Pagination page number.
  - <mark>?location=</mark> (string) – Filter by location.
  - <mark>?title=</mark> (string) – Filter by job title.
  
