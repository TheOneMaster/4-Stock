# ![app-icon](.github/gen.png) 4 Stock

[![download](https://img.shields.io/github/downloads/TheOneMaster/startggapp/total?color=blue&style=for-the-badge)](https://github.com/TheOneMaster/StartGGApp/releases/latest)


[![license](https://img.shields.io/github/license/TheOneMaster/StartGGApp)](./LICENSE)

4 Stock is mobile UI for the website [start.gg](https://www.start.gg/). It's built using React native and expo which allows for cross compilation to both IOS and Android.

Obtains data from the start.gg public GraphQL API. However, user-login is still not supported by this API, so login is disabled on the app until it is finalized.

## Features implemented

- Tournament Search
- Basic Filtering for tournaments (name)
- Tournament Details
- Pages for event Details (results, brackets, etc)

## Features to be implemented

- Add welcome screen on first time setup prompting for API key
- Get better sorting for tournament search (check API for something I missed or message maintaners)
- Additional filtering options for tournaments (start/end dates, online/offline)
- Add proper location support (use Google dev API for maps)
- Brackets page currently only lists the sets present in the bracket. Change to display tree formatting when possible
- Additional debug options & logging

---

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
