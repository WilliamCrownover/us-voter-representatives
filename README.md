# US Representatives

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This front-end web application aims to help United State voters easily find out information about their house representatives in congress. By using publicly available civic APIs we created a tool to bring hidden information to curious voters in a non-biased, comprehensible way. The two API’s used are [OpenFEC](https://api.open.fec.gov/developers/) and [ProPublica Congress](https://projects.propublica.org/api-docs/congress-api/). The app also includes a search tool to find your district number using your address input into [Google Civics API](https://developers.google.com/civic-information). The information of a specific congressional representative is displayed as cards: Information, Finance, Supporters, Vote History, and Travel.

## Table of Contents

- [User Story](#user-story)
- [Live Site](#live-site)
- [Code File Structure](#code-file-structure)
- [Technologies](#technologies)
- [Future Development](#future-development)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)
- [Credits](#credits)

## User Story
```
AS A curious US voter
I WANT to know more about my congressional representatives
SO THAT I can plan accordingly to support them
```

## Live Site

https://williamcrownover.github.io/us-voter-representatives/

![A user clicks to find info.](./assets/images/representat.gif)

## Code File Structure

- index.html:
    - optimized for the accessibility needs
    - responsive design for smaller screen sizes

- styles.css
  - optimized styles
  - comments about how they are styling respective elements groups
  
- script.js:
  - primary data collection script
  - working with objects
  - optimized code using functions

- lastsearched.js
  - provide function to store/retrieve last user district search

- stateData.js
  - Object file containing district info for each state

- findmyrep.js
  - provide functions to get user district from address

- info.js
  - loads data on Information Card

- finance.js
  - loads data on Finance Card

- supporters.js
  - loads data on Supporters Card

- travel.js
  - loads data on Travel Card

- votehistory.js
  - loads data on Vote History Card

## Technologies
- Materialize.css
- jQuery
- 3rd-party APIs
  - OpenFEC
  - ProPublica Congress
  - Google Civics API

## Future Development
I will be revisiting this project in the future to expand upon the interactivity of the website and refine the overall graphic design/layout. There are also opportunities to convert this project to a MVC file structure and implement some back-end features or databases.

## License
Licensed under the MIT License - https://opensource.org/licenses/MIT

## Contributing
You are welcome to fork this repo or make contributions to the project in collaboration with me.

## Contact

If you have any questions you can email me at williamcrownover1@gmail.com.

You can also check out my other work on GitHub at [WilliamCrownover](https://github.com/WilliamCrownover)

## Credits
This was originally a collaborative project developed by [Sheri](https://github.com/grudgecat), [Mariia](https://github.com/MaryVPie), [Sam](https://github.com/syadII), [Kenny](https://github.com/knyngun), and me, [William](https://github.com/WilliamCrownover).