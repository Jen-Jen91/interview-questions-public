# Task Notes

For this task, I implemented a new SingleListing screen to display details for an individual listing. For now, this screen only displays basic location and animal data, as well as a placeholder image with the user's name (this image would ideally use the remote media link in the listing data). This screen can be accessed by tapping a list item on the listings page, or via url. Both this new page and the Listings screen can only be accessed when the user is logged in - if logged out, they will be taken to the Home screen.

To try out these changes locally, you can go into the `ths-test-app` directory and run the app with `npm run [android|ios]`, then test the below:
- After pressing "LOG OUT", the Listings tab is no longer available.
- When logged in, go to the Listings tab and press a list item to take you to the SingleListing screen.
- In the terminal, run `npx uri-scheme open thstestapp://listing?listingId=[listingId] --[android|ios]` to open a deep link to an individual listing.
- When running the app on the web, change the url to `http://localhost:8081/listing?listingId=[listingId]` to take you to an individual listing.
- Pressing the back button for the SingleListing screen should always take you back to the Listings page.
  - Currently, if you access a new individual listing url while on another listing, the back button still takes you back to the Listings page. I can see arguments for either this functionality, or for you being taken back to the last visited listing - a UX discussion would be helpful here to ensure we maintain the flow we expect.
- Entering an invalid listingId on either of the above links should display a missing data error.
- Entering an invalid url should take you to the NotFound screen.
- Unit tests can be run with `npm run test`.

**NOTE**: I needed to use a Windows PC to complete this task, as such all testing has been done on an Android emulator and the web browser. As I do not have a physical iPhone device, I have not been able to test on iOS, so there is a risk of some potential uncaught issues. Ideally, full testing with all platforms would be done before merging.

## Potential Issues and Improvements

- Currently, the SingleListing screen needs to make an API call to fetch and filter all listings data. The individual listing object could be passed via params from the Listings screen, but this would not work for deep links and web urls where only the listingId is available. Ideally in this scenario, a new endpoint could be created to fetch an individual listing rather than the whole array.
- On the SingleListing screen, the screen header title is updated in a useEffect to display the listing title. This can cause a UI flicker on slower devices, so it could be worth creating a common header bar for all listings rather than conditionally rendering the title.
- One stretch goal could be to improve the flow when accessing a url when not logged in. For example, when logged out, if the user accesses the url for an individual listing, they are taken to the Home screen so they can log in. However, once they log in, they stay on the Home screen. It could be good to automatically take them to their intended listing page once log in has completed.
- Implement further testing - fully test the app navigation, log in/out functionality, and API errors. Some snapshot testing could also be useful for common components and default screens.
- Consider making use of ErrorBoundary to handle any uncaught errors and improve user experience.
- Create common files for app styles and colors. A common file for text copy could also be useful for maintainability and possible language translation.
