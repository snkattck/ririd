# ririd

A simple 301 redirector.

Install this module.

## Install

```npm install```

## Configure

Create a ```config/default.json```.

```node
{
    "defaultRedirect": "https://hmdc.harvard.edu",
    "redirectMap": [
        { "src": "^(.*)?jots\\.pub$", "dst": "https://techscience.org" }
    ]
}
```

In the configuration above, non-matching requests are redirected to hmdc.harvard.edu.

Any request which matches the regex in the ```src``` attribute defined in the list ```redirectMap``` 
is redirected to ```dst```

Query stringg and paths are automatically appended to destination hostname.

You can turn either off by specifying

```node
{
    "defaultRedirect": "https://hmdc.harvard.edu",
    "redirectMap": [
        {
            "src": "^(.*)?jots\\.pub$", 
            "dst": "https://techscience.org",
            "withPath": false,
            "withQs": false
        }
    ]
}
```

## Run

```npm start```
