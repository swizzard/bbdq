// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Bots" titleTo="bots" buttonLabel="New Bot" buttonTo="newBot">
        <Route path="/bots/new" page={BotNewBotPage} name="newBot" />
        <Route path="/bots/{id}/edit" page={BotEditBotPage} name="editBot" />
        <Route path="/bots/{id}" page={BotBotPage} name="bot" />
        <Route path="/bots" page={BotBotsPage} name="bots" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
