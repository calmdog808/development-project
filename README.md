# Development

### Link to Deployed Website
If you used the stencil code, this is `https://calmdog808.github.io/development-project/`

### Goal and Value of the Application
The goal of this app is to browse an online bakery and select some favorites to potentially buy in the future.

### Usability Principles Considered
For efficiency, I wanted to have the filters at the top, so people can easily see and adjust them. I also included a clear filters button so the filters are easily cleared. 
For learnability, I had all the filters on one side and favorites on the other, so it is not confusing what shows up where.
For memorability, the website has a very simple layout so it is not difficult to remember hat does what.

### Organization of Components
The BakeryItem component contains information for each item and how to structure the card along with what happens when you add to favorities. All filter handling is done in App.js.

### How Data is Passed Down Through Components
The bakery item is rendered in App.js which handles all the logic when filters and buttons are clicked to determine which bakery items to display.

### How the User Triggers State Changes
Users can select the product type they want to filter by or check off the allergens they have to filter for them. They can also press the sorting buttons to sort the items either by bestsellers or low to high price. Pressing the clear filters will clear the filters and display all items in bestsellers order. Users can add to favorites by pressing the add to favorities button which changes to a remove from favorities button when the item is already in the favorites.

