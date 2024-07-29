/*

= Processor for the `javadoc:` macro

Generates a hyperlink to a Javadoc page.

The version partial of the url can be configured throug
* a custom Asciidoc attribute named `javadoc-version`
* a macro attribute named `version`

Implementation based on the example https://docs.asciidoctor.org/asciidoctor.js/latest/extend/extensions/inline-macro-processor/


== Usage
javadoc:<className>#<memberName>[<attributes>]

where:
* className is a fully qualified class name
* memberName (optional) is the name of a member of that class 
* attributes (optional) is a comma-separated list of key-value pairs (key=value)

Supported attributes:
version:: the version partial of the url
label:: the label to use

== Examples
* javadoc:org.apache.tapestry5.ioc.services.TapestryIOCModule
* javadoc:org.apache.tapestry5.SymbolConstants#APPLICATION_CATALOG[version=5.3.7]

*/

const BASE_URL = 'https://tapestry.apache.org';


module.exports = function (registry) {
    registry.inlineMacro('javadoc', function() {
        var self = this
        self.process(function (parent, target, attrs) {

            const pattern = /(?<className>[\w\.]*)(#(?<memberName>\w+))?/;

            var matches = target.match(pattern);

            var className = matches.groups.className;

            var memberName = matches.groups.memberName;

            var path = className.replaceAll('.', '/');

            var simpleClassName = className.slice(target.lastIndexOf('.') + 1);

            var version = attrs.version == undefined
                ? parent.document.getAttribute('javadoc-version') == undefined
                    ? 'current'
                    : parent.document.getAttribute('javadoc-version')
                : attrs.version;
            var memberSuffix = memberName == undefined
                ? ''
                : '#' + memberName;

            var url = `${BASE_URL}/${version}/apidocs/${path}.html${memberSuffix}`;

            var label = attrs.label == undefined
                ? simpleClassName + (memberName != null ? ('.' + memberName) : '')
                : attrs.label;

            var link = `<a href="${url}">${label}</a>`;

            return self.createInline(parent, 'quoted', link, {'type' : 'monospaced'});
        })
    })
}
