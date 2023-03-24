# Community Solid Server configuration generator

A tool made to help users in creating their own custom configurations for the 
[Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer).

A live version can be found at <https://communitysolidserver.github.io/configuration-generator/>.

## Modifying the UI and output using query parameters

If you have an external CSS component, you can link to the generator in such a way
that it can be used to generate configurations that work with your new component.
All of these options can be combined.

The site takes 3 query parameters as input to further modify the options and results users get to see:
  * `config` can be used to add additional data to the output, in case your component needs additional configuration.
  * `options` limits the options available to a user, in case some would conflict with your component.
  * `removeImports` removes the chosen imports from the output, in case your component replaces some of the imports.

For example, [this page](https://communitysolidserver.github.io/configuration-generator/?options={%22index%22:[]}&removeImports=[%22css:config/util/index%22]&config=[%20%22https://raw.githubusercontent.com/CommunitySolidServer/Recipes/main/mashlib/config-mashlib.json%22,%20%22https://raw.githubusercontent.com/CommunitySolidServer/hello-world-component/main/hello-world-file.json%22])
allows you to generate configurations that also include the necessary components
to support the [mashlib configurations](https://github.com/CommunitySolidServer/Recipes/tree/main/mashlib)
of the CSS Recipes repository and the component of the 
[Hello World tutorial repository](https://github.com/CommunitySolidServer/hello-world-component).
You would still need to install the necessary dependencies to use such a configuration though.

### Adding data to the output

The `config` parameter can be used to append data to the generated configuration.
A JSON body containing 3 (optional) fields is expected: `@context`, `import` and `@graph`.
These will be merged with the output configuration.
Duplicate context values will be filtered out,
and imports that correspond to one of the standard CSS imports will be removed.

The actual value of the parameter can be one of the following:
  * A JSON serialization of the expected body.
  * A URL pointing to such a JSON serialization.
  * A JSON serialization of an array of URL strings, each of those pointing to such serializations.
    These will be merged together.

This [example](https://communitysolidserver.github.io/configuration-generator/?config=%7B%0A%20%20%22%40context%22%3A%20%20%22https%3A%2F%2Flinkedsoftwaredependencies.org%2Fbundles%2Fnpm%2Fhello-world-module%2F%5E5.0.0%2Fcomponents%2Fcontext.jsonld%22%2C%0A%20%20%22import%22%3A%20%5B%20%20%22hello-world%3Aconfig%2Fhello-world.json%22%20%5D%0A%7D%0A)
adds a new context and import to the result.

Similarly, this [example](https://communitysolidserver.github.io/configuration-generator/?config=https%3A%2F%2Fraw.githubusercontent.com%2FCommunitySolidServer%2Fhello-world-component%2Fmain%2Fhello-world-file.json)
adds all entries from the config found [here](https://raw.githubusercontent.com/CommunitySolidServer/hello-world-component/main/hello-world-file.json)
to the result.

### Limiting the options available to users

The `options` parameter expects a JSON key/value object with the keys being the choices for which you want to limit the options,
and the values being a string or an arrays of strings containing the options that are still valid.

To know what strings to use for the available choices and strings, you can have a look at the HTML source of the generator, 
or the objects in <https://github.com/CommunitySolidServer/configuration-generator/tree/main/src/choices/specifics>.

For example, the following page only allows the backend to be the in-memory or file options:
<https://communitysolidserver.github.io/configuration-generator/?options=%7B%22backend%22%3A%5B%22memory%22%2C%22file%22%5D%7D>

If only 1 option is provided for a given choice, it will be removed from the page and instead embedded as a hidden input.

If no options are provided, the entire block is removed,
but you should also make sure to remove the corresponding imports as mentioned below to prevent unexpected behaviour.

### Removing imports

The `removeImports` parameter expects a string or an array of strings. 
Any import that contains that string or any of the strings in the array will be removed.
This is applied after adding the imports from the `config` parameter.

For example, the following page will remove all storage related imports from the output configuration:
<https://communitysolidserver.github.io/configuration-generator/?removeImports=%5B%22css%3Aconfig%2Fstorage%2F%22%5D>
