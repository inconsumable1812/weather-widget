# weather-widget

visualization of openWeather [api](https://openweathermap.org/api)

[demo](https://inconsumable1812.github.io/weather-widget/)

## Using the plugin

You can add this widget to their websites as simple as inserting the snippet into an HTML-page: `<script defer="defer" url="{URL to the script}"></script>` and optionally `<link href="{css file}" rel="stylesheet" />`

### How to get files

#### first option

- download `js` file from [url](https://github.com/inconsumable1812/weather-widget/blob/gh-pages/js/app.a5eef2df.js)
- download `css` file from [url](https://github.com/inconsumable1812/weather-widget/blob/gh-pages/css/app.2c75db3c.css)

And add this files to your HTML

#### second option

1. clone this repository

```
git clone https://github.com/inconsumable1812/weather-widget.git
cd weather-widget
npm i
```

1. run `npm run build`.
1. `dist` folder will contain `js` and `css` files.
1. add this files to your HTML

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Deploy

```
npm run deploy
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
