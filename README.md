
# Le bar à outils

## Scope of this project
The idea behind this website is twofold:
1. Attempt to make a (very) fast website, both in work time and load time.
It takes 226ms to load cacheless with a 0.13 LCP and 130ms once the cache is set up even though the main page is somewhat content rich.
Going with an SSG was an easy choice when aiming for performance, and Astro was, I think, as satistying as an SSG could be for the most part.
It handles images really well so I had nothing to do other than pre-optimize them. There's not as much documentation as it should though.

2. Have fun :)

This project is open-source software licensed under the [GPL-3.0 license](https://opensource.org/licenses/GPL-3.0). Feel free to fork, modify, and use it in your projects.

## Commands
All commands are run from the root of the project, from a terminal:
| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Attribution

Base theme by https://lexingtonthemes.com
Forked from https://github.com/michael-andreuzza