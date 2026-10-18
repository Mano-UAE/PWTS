# Fintech Mobile Trading App --- QA Strategy

> **Goal:** Assess release readiness in two weeks, prioritising customer
> funds, trade accuracy, account security, and mobile stability.

## 1. Overview

With no existing test suite, I would use risk-based testing, validate
the critical customer journeys first, and base the release decision on
evidence.

``` mermaid
flowchart LR
    A["Assess risks"] --> B["Test critical flows"]
    B --> C["Fix + retest"]
    C --> D{"Ready?"}
    D -- Yes --> E["GO"]
    D -- No --> F["NO-GO"]
```

## 2. Assumptions

-   The app supports registration, login/MFA, deposits, withdrawals,
    buy/sell orders, portfolio, and transaction history.
-   APIs, staging, test accounts, and safe simulated trades are
    available.
-   API documentation, builds, and known issues can be provided.
-   Supported OS versions will be confirmed.
-   Third-party internals are out of scope; the app's integrations are
    in scope.

## 3. QA Philosophy

**Risk first. Test early. Release based on evidence.**

-   Protect customer funds and account access first.
-   Start QA during refinement, not after development.
-   Combine functional, API, integration, security, regression,
    exploratory, and device testing.
-   Automate stable repeatable checks; do not rely on automation alone.
-   Use staging and test accounts only.

## 4. Answer 1 --- Where Do I Start?

Meet the Product Owner and a senior developer to understand money flows,
broker/exchange/payment integrations, known issues, and whether launch
is full or phased. Run the app on a real iPhone and Android device;
request API docs, build details, and crash-monitoring information.

``` mermaid
flowchart TD
    A["Login + MFA"] --> B["Deposit"]
    B --> C["View market"]
    C --> D["Buy order"]
    D --> E["Verify execution + portfolio"]
    E --> F["Sell order"]
    F --> G["Withdraw"]
    style D fill:#ffe0e0,stroke:#c62828,color:#222
    style E fill:#ffe0e0,stroke:#c62828,color:#222
```

By Day 2, agree on five critical areas: trade execution,
balances/portfolio, deposits, withdrawals, and account security.

## 5. Answer 2 --- Testing Strategy

  ------------------------------------------------------------------------
  Priority                Area                    Key checks
  ----------------------- ----------------------- ------------------------
  **P0 Critical**         Trading                 Correct
                                                  order/quantity/status;
                                                  no duplicates

  **P0 Critical**         Funds & portfolio       Correct deposits,
                                                  withdrawals, balances,
                                                  holdings, P&L

  **P1 High**             Login/MFA               Session expiry, logout,
                                                  access control

  **P1 High**             Mobile reliability      Network loss, restart,
                                                  backgrounding during
                                                  trades

  **P2 Normal**           UI/notifications        Screens, messages,
                                                  notification behaviour
  ------------------------------------------------------------------------

**High-risk scenarios**

  -----------------------------------------------------------------------
  ID                      Scenario                Priority
  ----------------------- ----------------------- -----------------------
  TRD-001/002             Buy/sell order and      Critical
                          verify portfolio        

  TRD-003                 Prevent duplicate order Critical
                          after repeat tap/retry  

  TRD-004                 Network loss during     Critical
                          order submission        

  WAL-001/002             Deposit/withdraw and    Critical
                          verify status + balance 

  SEC-001/002             Session expiry and MFA  High
                          validation              
  -----------------------------------------------------------------------

Test functional flows, API responses, integrations, negative cases,
security, regression, and iOS/Android compatibility. Check backend
records where access is available.

## 6. Answer 3 --- QA Within Sprint

``` mermaid
flowchart LR
    A["Refinement"] --> B["Acceptance criteria"]
    B --> C["Prepare tests"]
    C --> D["Test early build/API"]
    D --> E["Report defects"]
    E --> F["Fix + retest"]
```

-   **Refinement:** Check limits, price/balance changes, and failure
    cases.
-   **Development:** Prepare scenarios, validate APIs, explore builds,
    and report defects early.
-   **Before completion:** Acceptance and negative tests pass;
    regression impact is assessed; no critical defect remains.
-   **Sprint end:** Run smoke and relevant device regression; report
    outstanding risks.

## 7. Answer 4 --- Regression Strategy

  -----------------------------------------------------------------------
  Suite                   When                    Coverage
  ----------------------- ----------------------- -----------------------
  Smoke (\~10 min target) Every suitable build    Login, portfolio,
                                                  market data, buy/sell,
                                                  logout

  Financial regression    Each release candidate  Deposits, withdrawals,
  (\~1 hour target)                               balances, orders,
                                                  cancellation, portfolio

  Device regression       Before release /        Supported iOS versions
                          relevant changes        and representative
                                                  Android devices
  -----------------------------------------------------------------------

``` mermaid
flowchart LR
    A["Change/fix"] --> B["Impact tests"]
    B --> C["Critical smoke"]
    C --> D["Full release regression"]
    D --> E["Review results"]
```

Times are estimates and depend on environment and automation. Automate
stable checks first; keep exploratory testing manual.

## 8. Answer 5 --- Release Concerns

  -----------------------------------------------------------------------
  Concern                 Example                 Decision
  ----------------------- ----------------------- -----------------------
  Trade error             Wrong quantity or       No-Go
                          failed order shown as   
                          successful              

  Balance mismatch        Deposit succeeds but    No-Go
                          balance is wrong        

  Duplicate order         Retry creates extra     No-Go
                          trade                   

  Security flaw           Unauthorised account    No-Go
                          access/transaction      

  Poor monitoring         Failures go unnoticed   Confirm alerts,
                                                  ownership, rollback
  -----------------------------------------------------------------------

Consider phased launch only after critical risks are resolved and
monitoring and rollback criteria are agreed.

## 9. Test Plan

**In scope:** Registration/login/MFA, deposits, withdrawals, buy/sell,
portfolio, transaction history, notifications, mobile reliability, and
app integrations.

**Out of scope:** Internal testing of third-party vendor systems.

  -----------------------------------------------------------------------
  Test type                           Purpose
  ----------------------------------- -----------------------------------
  Functional / exploratory            User journeys and business rules

  API / integration                   Responses, errors, retries, status,
                                      consistency

  Negative                            Insufficient funds, rejected
                                      payment, expired session,
                                      duplicates

  Security                            MFA, sessions, authorisation,
                                      account isolation

  Compatibility / reliability         iOS/Android, network loss, restart
                                      recovery

  Regression                          Check fixes have not broken
                                      critical flows
  -----------------------------------------------------------------------

## 10. Risk Matrix

  -------------------------------------------------------------------------------
  Risk                     Likelihood        Impact            Priority /
                                                               response
  ------------------------ ----------------- ----------------- ------------------
  Incorrect trade          Medium            Critical          **P0 --- Block
  execution                                                    release**

  Duplicate orders         High              Critical          **P0 --- Block
                                                               release**

  Balance/reconciliation   Medium            Critical          **P0 --- Block
  error                                                        release**

  Unauthorised access      Low               Critical          **P0 --- Block
                                                               release**

  Withdrawal               Medium            High              **P0 --- Resolve
  failure/status error                                         before release**

  Crash during trade       Medium            High              **P1 --- Verify
                                                               order
                                                               state/recovery**
  -------------------------------------------------------------------------------

Initial likelihood estimates; update with test results and engineering
input.

## 11. Release Readiness Checklist

-   [ ] Buy/sell orders are correct; duplicates are prevented.
-   [ ] Deposits, withdrawals, statuses, and balances reconcile.
-   [ ] Portfolio holdings/P&L are verified against available
    authoritative records.
-   [ ] MFA, session expiry, and authorisation pass.
-   [ ] Critical regression passes on supported iOS and Android.
-   [ ] No open critical financial or security defects.
-   [ ] Monitoring, incident response, and rollback are ready.
-   [ ] Remaining risks are documented and accepted by stakeholders.

## 12. Release Recommendation

``` mermaid
flowchart TD
    A["Review test evidence"] --> B{"Critical flows verified?"}
    B -- No --> C["NO-GO"]
    B -- Yes --> D{"Critical defects open?"}
    D -- Yes --> C
    D -- No --> E["Recommend GO"]
    C --> F["Fix + retest"]
    style C fill:#ffe0e0,stroke:#c62828,color:#222
    style E fill:#dcfce7,stroke:#2e7d32,color:#222
```

**GO:** Critical financial flows are verified, blockers are resolved,
regression passes, and stakeholders accept remaining risks.

**NO-GO:** Funds, trade execution, balances, or account security remain
at risk---or there is insufficient evidence to verify critical flows.
