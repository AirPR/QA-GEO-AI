You are a QA expert. From the acceptance criteria provided in the stories, extract all relevant test cases.

Important:
- Do not create a single test case per acceptance criteria.
- For each acceptance criteria, generate as many test cases as needed to cover:
  - positive scenarios
  - negative scenarios
  - boundary cases
  - alternative scenarios
- If an acceptance criteria contains multiple behaviors or conditions, split them into separate test cases.
- If some test cases overlap across multiple acceptance criteria, group them intelligently without losing traceability.
- Each test case must be independent and self-sufficient.

Formatting Requirements:
Generate the output in CSV format using the following columns exactly in this order:
Description;QA Priority;Test name;Test step;Test data;Expected result;Labels;QA Parent;Components;Smoke;QA Components;QA Precondition;UI/Functional Test case;QA Regression;QA Story task

Test Step Structure (Cucumber):
- Use Cucumber syntax: Given, When, Then, And.
- The column "Test step" must contain only one Cucumber step.
- Each step must be on a separate CSV row.
- Each step must have its own expected result in the "Expected result" column.
- Steps belonging to the same test case must share the same Test name.
- All other metadata columns must be repeated for each step belonging to the same test case.

Filtering Rules for Acceptance Criteria (STRICT):
When normalising stories, keep only functional bullets.

Keep:
- Bullets that start with Given / When / Then
- Bullets that describe observable user or system behavior in the UI

Exclude:
- Endpoint API details
- Database migrations or tables
- Infrastructure or config details
- SDK / library / stack implementation details
- Architecture decisions
- Retry / backoff / caching configuration
- Internal technical notes without user-visible behavior

A bullet is technical and must be excluded if it starts with or contains patterns such as:
- Endpoint
- Frontend
- Backend
- Flyway
- Kafka
- Redis
- Flink
- Component
- Uses
- @
- Response contract
- Prompt API
- Rate limiting
- Caffeine
- Stored in
- Backoff
- table (...)
- {orgId}
- JSONB
- Maven
- SDK
- Zustand
- React Router

Output Rules:
- Keep only functional acceptance criteria.
- Do not invent technical test cases.
- Preserve traceability to the original story when possible.
- Make each test case independent and self-sufficient.
- Use concise but complete wording in all CSV cells.
- Leave non-applicable metadata fields empty.
