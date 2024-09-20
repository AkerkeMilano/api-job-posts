## Job Posting API Endpoints
#### 1. POST <mark>/api/posts</mark>
**Description:** Allows authenticated recruiters to create a new job posting.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>

#### 2. GET <mark>/api/posts</mark>
**Description:** Retrieves a list of job postings with optional pagination and filters.

**Query Parameters:**
  - <mark>?page=</mark> (integer) – Pagination page number.
  - <mark>?location=</mark> (string) – Filter by location.
  - <mark>?title=</mark> (string) – Filter by job title.
  
#### 3. PUT <mark>/api/posts/:id</mark>
**Description:** Allows recruiters to update a job posting they created. Only the recruiter who created the job can update it.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>
  
**Request Parameters:**
  - <mark>:id</mark>: Job post ID to be updated.

#### 4. DELETE <mark>/api/posts/:id</mark>

**Description:** Allows recruiters to delete a job posting they created. Only the recruiter who created the job can delete it.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>

**Request Parameters:**
  - <mark>:id</mark>: Job post ID to be deleted.

## Job Applications API Endpoints
#### 1. POST <mark>/api/posts/:id/apply</mark>
**Description:** Job seekers can apply to a job by submitting their name, email, and resume.

**Request Parameters:**
  - <mark>:id</mark>: Job post ID to apply

#### 2. GET <mark>/api/applications/:postId</mark>
**Description:** Recruiters can view applications for their job postings.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>

**Request Parameters:**
  - <mark>:postId</mark>: Job post ID
#### 3. PATCH <mark>/api/applications/:id</mark>
**Description:** Recruiters can shortlist or reject application status.

**Headers:**
  - <mark>Authorization: Bearer <jwt_token></mark>

**Request Parameters:**
  - <mark>:id</mark>: Job application ID to update status

## Authentication and Authorization API Endpoints
#### 1. POST <mark>/api/auth/register</mark>
**Description:** Register recruiter

#### 2. POST <mark>/api/auth/login</mark>
**Description:** Login recruiter
