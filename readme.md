# ![app-icon](.github/gen.png) 4 Stock

[![download](https://img.shields.io/github/downloads/TheOneMaster/startggapp/total?color=blue&style=for-the-badge)](https://github.com/TheOneMaster/StartGGApp/releases/latest)

[![license](https://img.shields.io/github/license/TheOneMaster/StartGGApp?style=flat-square)](./LICENSE)
![version](https://img.shields.io/github/v/release/TheOneMaster/startggapp?style=flat-square)

4 Stock is mobile UI for the website [start.gg](https://www.start.gg/). It's built using React native and expo which allows for cross compilation to both IOS and Android. Currently, only the android app is available publicly since I dont have an iphone to test the app on. Additionally, sideloading on ios seems like an immense pain.

All data is obtained from the start.gg public GraphQL API. This sometimes leads to incomplete details for tournaments/events if the TO's have not filled out the information on start.gg.

User login is currently unsupported on this app until [start.gg OAuth is available](https://developer.start.gg/docs/oauth/oauth-overview).

<details><summary>Features</summary>

- Tournament Search
    - Name
    - Tournament Attributes
- Tournament Details
- Event Details
- User Details
- Featured tournaments

</details>

<details><summary>Features to be implemented</summary>

- Location support
- Draw bracket as a tree
- OTA update support
- Welcome screen

</details>

## License

    Copyright 2023 TheOneMaster

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
