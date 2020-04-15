# ririd

A simple 301 redirector.

Install this module.

## Configure
Create a ```config/default.json```.

```node
{
    "defaultRedirect": "https://hmdc.harvard.edu",
    "redirectMap": [
        { "src": "jots\\.pub$", "dst": "https://techscience.org" }
    ]
}
```

In the configuration above, non-matching requests are redirected to hmdc.harvard.edu.

Any request which matches the regex in the ```src``` attribute defined in the list ```redirectMap``` 
is redirected to ```dst```

## Run
```npm start```

