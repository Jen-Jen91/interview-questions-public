# Technical Assessment: App

The test app is a simple Expo/React Native application using react-navigation, created using [‘npx create-expo-app --example with-react-navigation’](https://docs.expo.dev/more/create-expo/).

In the existing navigation structure there is a stack navigator, containing a tab navigator with two tabs - Home and Listings. The listings screen displays a list of mock data, similar to the data we hold for listings on our platform.

There is a mock API at /api/listings that currently returns that mock data - this is implemented using Mock Service Worker. There is also mock log in/log out functionality, implemented with AsyncStorage, and you can change that value using the button on the Home screen.

As long as you are [set up to create an expo development build](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build), you should be able to clone the repository, run ‘npm install’ inside the ‘ths-test-app’ directory, and then run ‘npm run android’ or ‘npm run ios’ to build the project.
The test will focus primarily on implementing navigation and external linking related features. Note: we are using [nvm](https://github.com/nvm-sh/nvm) to manage node versions and have tested this against the node version listed in the `.nvmrc`.

Unless otherwise stated, you’re welcome to use external libraries and dependencies as needed.

## The Tasks

We’d like you to add the following functionality:
- Create a new screen for an individual listing, accessible by tapping one of the list items on the Listings screen. Display some of the listing data on that screen.
- Make the listings and listing screens only accessible when logged in
- Add configuration to handle a URL such as ‘ths-test-app://listing?listingId=123456’ and open the correct individual listing
- Opening a listing URL while on the listing screen should add a new listing screen on top of the existing one
- Gracefully handle a link to a listing that can't be retrieved over the network
- Ensure your new feature is reliable and maintainable. We use Jest and React Native Testing Library in our codebase.

We recommend spending no more than a few hours on this exercise. In our next conversation, we’ll discuss your implementation, cover any parts not completed, and talk through possible improvements.

Once you’re done, please add Jack-Gill-TH as a collaborator to your repo so we can view your solutions.

If anything is unclear or you have any questions at any stage, please don’t hesitate to reach out.

We look forward to seeing your approach and discussing your work further!


## Resources

- [React Navigation documentation](https://reactnavigation.org/)
- [Expo documentation](https://docs.expo.dev/)
