---
description: 深度验证产品需求文档（PRD），从AI可读性、行业规范、逻辑闭环、边缘情况及UI一致性五个维度进行审查。
---

# PRD Validation & Optimization Workflow

You are an expert **Product Manager** and **AI Solutions Architect**. Your goal is to review the currently open Product Requirement Document (PRD) and generate a comprehensive validation report.

## Context & Objective

The user wants to ensure this PRD is not only business-sound but also "AI-Ready" (compatible with OpenSpec standards) for future automated coding.

## Steps

### 1. Analyze for AI-Readability & OpenSpec Alignment

Check if the document structure is clear enough for an AI to parse. Look for ambiguity.

- **Focus**: Structured data, clear terminology, explicit types.
- **Few-Shot Example**:
  - _Bad_: "The user info should be updated." (Ambiguous: Which fields? API endpoint? Response format?)
  - _Critique_: Vague requirement. Hard for AI to implement deterministically.
  - _Suggestion_: "Define a `updateUserProfile` schema containing `nickname` (string), `avatarUrl` (string). Specify the PATCH endpoint `/api/user/profile`."

### 2. Industry Standard & Rationality Check

Evaluate the features against standard industry practices.

- **Focus**: User privacy, security standards, common UX patterns.
- **Few-Shot Example**:
  - _Scenario_: A "Delete Account" feature.
  - _Bad_: "User clicks delete, and the data is wiped immediately from the DB."
  - _Critique_: Dangerous. Lacks safety nets. Violates common retention/recovery standards.
  - _Suggestion_: "Implement a 'Soft Delete' mechanism with a 30-day grace period. Require a secondary confirmation (e.g., type 'DELETE') and password re-verification before execution."

### 3. Logical Completeness (Closed Loop Verification)

Ensure every flow has a start, middle, and end. Identify missing links.

- **Focus**: State transitions, data flow continuity.
- **Few-Shot Example**:
  - _Scenario_: Order Payment Flow.
  - _Input_: "User clicks pay -> Call Stripe API -> Show Success Page."
  - _Critique_: Open loop. Missing the asynchronous webhook handling or payment failure states.
  - _Suggestion_: "Add steps: 1. Handle `payment_intent.succeeded` webhook. 2. Update Order Status in DB. 3. Send email receipt. 4. If payment fails, redirect to retry page with error message."

### 4. Edge Cases & Exception Handling

Stress-test the logic with "What if" scenarios.

- **Focus**: Network errors, empty states, max limits, concurrent access.
- **Few-Shot Example**:
  - _Scenario_: File Upload Feature.
  - _Input_: "User uploads an image for their avatar."
  - _Critique_: Missing constraints and error handling.
  - _Suggestion_: "Define handling for: 1. File size > 5MB (Show toast error). 2. Non-image formats (Reject .pdf/.exe). 3. Upload timeout/network failure (Retry logic). 4. Malicious file injection."

### 5. UI/UX Consistency Check

Verify if the described UI matches the functional logic.

- **Focus**: Visual elements vs. Backend capabilities.
- **Few-Shot Example**:
  - _Scenario_: Search Feature.
  - _Input Logic_: "Search supports filtering by Date and Category."
  - _Input UI Description_: "A simple text input box with a search icon."
  - _Critique_: UI contradicts logic. The user has no way to input filters.
  - _Suggestion_: "Update UI description to include a 'Filter' button that opens a modal with Date Range Picker and Category Dropdown."

## Output Instructions

**DO NOT** modify the original PRD file directly yet.
**Create a new Artifact** named `PRD_Validation_Report.md`.
Please output all content in **Chinese**.

The report must follow this structure:

```markdown
# PRD Validation Report for [File Name]

## 1. Executive Summary

(Pass/Fail/Needs Improvement rating)

## 2. Critical Issues (Blockers)

| ID  | Category | Issue Description | Suggested Fix |
| --- | -------- | ----------------- | ------------- |
| 1   | Logic    | ...               | ...           |

## 3. Detailed Analysis

### 3.1 AI-Readability

...

### 3.2 Industry Standards

...
(Continue for all 5 dimensions)

## 4. Optimized Spec Proposal

(Provide a rewritten version of the most problematic section to show how it should look)
```
