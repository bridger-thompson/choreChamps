# Chore Chart Website Project Outline

## Nov 4th:

- [ x ] Finish requirements gathering
- [ x ] Stand up client, api, and db. They can interact with one another.
- [ x ] Design DB
- [ x ] Automated deployment pipeline - CI/CD Github Actions Pipeline
  - HTTPS support
  - Live production environment
  - Linting/testing

## Nov 11th:

- [ x ] Frontend can hit backend can hit db
- [ x ] Authentication
- [ x ] Can link parent and child accounts
- [ x ] Parents can select a child and that selection persists between pages (like docs)
  - Context
- [ x ] Parents can configure chores for a child
  - Chores have a name, description, points, and status
- [ x ] Kids can see chores for that day

## Nov 18th:

- [ x ] Kids can mark a chore as complete and incomplete
- [ x ] Kids can leave a note on a chore
- [ x ] Completing a chore gives the child points
- [ x ] Completing all chores for that day gives bonus points
- [ x ] Kids can cycle through future and past days

## Nov 25th:

- [ x ] Parent can override their childrens points
- [ x ] Parents can configure prizes for a child
  - Prizes have a name, url, image, and price
- [ x ] Kids can see prizes and their point values
- [ x ] Kids can purchase prizes with their points
- [ x ] Pictorial navigation/menus

## Dec 2:

- [ x ] Chores can be repeatable automatically from the interval the parent states
- [ x ] Parents can see number of chores a child has per day, ratio/percentage of chores they completed that day/week/month, and other metadata
- [ x ] Both can see a recent history of prizes the child has purchased
- [ x ] Parent can undo a purchase
- [ x ] Can toggle dark/light mode (defaults to browser setting)
  - Store in local storage
- [ x ] Frontend authorization for parent page

## Dec 9 (due date):

- [ x ] Websocket (chat)
- [ ] Lots of animations, especially on the child view
- [ x ] Finishing touches

## Extra Stretch Goals:

- [ ] Can optionally defer chores (parent configures for how long/often)
- [ ] Send parent an email when child purchases prize
- [ ] Multi-day streak bonuses
- [ ] Hidden games/easter eggs
- [ ] Parent analytics
- [ ] Alternative child logins

## Requirements:

- Use of Local Storage
  - Theme selector - ThemeSelector.tsx
  - Child selector (chores and prizes pages) - childContext.tsx
- Client side state stores (e.g. redux or context)
  - Child selector - childContext.tsx
- Toasts / global notifications or alerts
  - Errors - queryClient.tsx
  - Confirmation toasts - ConfirmationToast.tsx
- Error handling (both on api requests and render errors)
  - Query client toasts and logs errors - queryClient.tsx
- Network Calls (read/write data)
  - Service files
- websocket
  - Chat - WebsocketChat.tsx WebsocketChatContext.tsx
- Developer type helping (typescript)
  - Everywhere
- 10+ pages via a router
  - Home, Chores, Prizes, Prize history, Chat, Manage children, Manage prizes, Manage chores, Add/edit prize, Add/edit chore
- CI/CD pipeline
  - Github actions - chore_champs.yml
- https support
  - Swag
- Live production environment
  - https://choreChamps.duckdns.org:5003
- Automated testing and linting in the pipeline (abort build if fails)
  - Github actions
- 3+ generic form input components
  - Checkbox input - CheckboxInput.tsx
  - Number input - NumberInput.tsx
  - Dropdown select input - SelectInput.tsx
  - Text input - TextInput.tsx
- 4+ layout components
  - Custom Modal Wrapper - CustomModal.tsx
  - Tabbed Menu - TabbedMenu.tsx
  - List of items - FrostedListGroup.tsx
  - Colored Card - ColoredCard.tsx
- authentication and user account support
  - keycloak
- admin pages and public pages
  - Authorization on parent pages
