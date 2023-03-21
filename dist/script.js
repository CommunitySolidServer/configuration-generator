"use strict";
// TODO: way to integrate this with recipes and/or make this project easily extensible by recipes repo?
//       ^ just any repo in general, such as hello world
//       ^ service that takes stuff as input and then wraps around that?
const CONTEXT = 'https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld';
const DEFAULT_IMPORTS = [
    generateImport('app', 'main', 'default'),
    generateImport('app', 'variables', 'default'),
    generateImport('http', 'handler', 'default'),
    generateImport('http', 'static', 'default'),
    generateImport('identity', 'handler', 'default'),
    generateImport('identity', 'pod', 'static'),
    generateImport('ldp', 'authentication', 'dpop-bearer'),
    generateImport('ldp', 'handler', 'default'),
    generateImport('ldp', 'metadata-parser', 'default'),
    generateImport('ldp', 'metadata-writer', 'default'),
    generateImport('ldp', 'modes', 'default'),
    generateImport('storage', 'middleware', 'default'),
    generateImport('util', 'logging', 'winston'),
    generateImport('util', 'representation-conversion', 'default'),
    generateImport('util', 'variables', 'default'),
];
function generateImport(group, entry, choice) {
    return `css:config/${group}/${entry}/${choice}.json`;
}
function getServerFactoryImport(webSockets, https) {
    if (webSockets) {
        return generateImport('http', 'server-factory', https ? 'https-websockets' : 'websockets');
    }
    return generateImport('http', 'server-factory', https ? 'https-no-websockets' : 'no-websockets');
}
function generateImports(choices) {
    var _a;
    const imports = [...DEFAULT_IMPORTS];
    if (choices.backend === 'sparql' && choices.internal === 'resource-store') {
        throw new Error('SPARQL backend can not be chosen if the backend is used for internal storage.');
    }
    if (choices.backend === 'regex' && choices.internal === 'memory') {
        throw new Error('Combining the regex backend with in-memory internal storage does not make sense.');
    }
    if (!choices.registration && !choices.setup && !choices.initializeRoot) {
        throw new Error('There would be no way to write data to this server.');
    }
    imports.push(generateImport('app', 'init', choices.initializeRoot ? 'initialize-root' : 'default'));
    imports.push(generateImport('app', 'setup', choices.setup ? 'required' : 'disabled'));
    imports.push(generateImport('http', 'middleware', choices.webSockets ? 'websockets' : 'no-websockets'));
    imports.push(getServerFactoryImport(choices.webSockets, choices.https));
    imports.push(generateImport('identity', 'access', choices.restrictIdpApi ? 'restricted' : 'public'));
    imports.push(generateImport('identity', 'email', choices.email ? 'example' : 'disabled'));
    imports.push(generateImport('identity', 'ownership', choices.ownership ? 'token' : 'unsafe-no-check'));
    imports.push(generateImport('identity', 'registration', choices.registration ? 'enabled' : 'disabled'));
    // In v5 there are 2 relevant imports for WAC
    imports.push(generateImport('ldp', 'authorization', choices.authorization === 'wac' ? 'webacl' : 'allow-all'));
    imports.push(generateImport('util', 'auxiliary', choices.authorization === 'wac' ? 'acl' : 'no-acl'));
    imports.push(generateImport('storage', 'backend', choices.backend));
    imports.push(generateImport('storage', 'key-value', choices.internal));
    imports.push(generateImport('util', 'identifiers', choices.subdomain ? 'subdomain' : 'suffix'));
    imports.push(generateImport('util', 'index', choices.index ? 'example' : 'default'));
    imports.push(generateImport('util', 'resource-locker', (_a = choices.locking) !== null && _a !== void 0 ? _a : 'debug-void'));
    return imports;
}
function generateOverride(instance, type, comment, params) {
    return {
        comment: comment,
        '@type': 'Override',
        overrideInstance: { '@id': instance },
        overrideParameters: Object.assign({ '@type': type }, params)
    };
}
function generateBody(choices) {
    const body = [];
    if (choices.email) {
        const comment = 'The settings of your email server.';
        const params = {
            senderName: 'Community Solid Server <solid@example.email>',
            emailConfig_host: 'smtp.example.email',
            emailConfig_port: 587,
            emailConfig_auth_user: 'solid@example.email',
            emailConfig_auth_pass: 'NYEaCsqV7aVStRCbmC'
        };
        body.push(generateOverride('urn:solid-server:default:EmailSender', 'BaseEmailSender', comment, params));
    }
    if (choices.index) {
        const comment = 'An example of how the UI converter can be configured.';
        const params = {
            contentType: 'text/html',
            filePath: './node_modules/mashlib/dist/databrowser.html',
            options_container: true,
            options_document: false,
            options_minQuality: 1
        };
        body.push(generateOverride('urn:solid-server:default:DefaultUiConverter', 'ConstantConverter', comment, params));
    }
    if (choices.backend === 'regex') {
        const comment = 'Overrides the default rule to make sure internal data is stored on the file system.';
        const params = {
            rules: [
                {
                    comment: 'Stores internal data in the file system',
                    '@type': 'RegexRule',
                    regex: '^/\\.internal/',
                    store: { '@id': 'urn:solid-server:default:FileResourceStore' }
                },
                {
                    comment: 'Send everything else to the SPARQL store.',
                    '@type': 'RegexRule',
                    regex: '.*',
                    store: { '@id': 'urn:solid-server:default:SparqlResourceStore' }
                }
            ]
        };
        body.push(generateOverride('urn:solid-server:default:RouterRule', 'RegexRouterRule', comment, params));
    }
    return body;
}
function generateConfig(choices) {
    const imports = generateImports(choices).sort();
    const body = generateBody(choices);
    return {
        '@context': CONTEXT,
        import: imports,
        '@graph': body,
    };
}
//# sourceMappingURL=script.js.map