/*
= Processor for the javadoc: macro

Generates a hyperlink to an issue tracker page.  

== Usage
issue:<id>[]

where
* id className is a fully qualified class name

== Example
issue:1040[]

based on the example https://docs.asciidoctor.org/asciidoctor.js/latest/extend/extensions/inline-macro-processor/
*/

const BASE_URL = 'https://issues.apache.org/jira/browse';
const ISSUE_PREFIX = 'TAP5-';

module.exports = function (registry) {
    registry.inlineMacro('issue', function() {
        var self = this
        self.process(function (parent, target) {
            var label = `${ISSUE_PREFIX}${target}`
            var url = `${BASE_URL}/${label}`
            var link = `<a href="${url}">${label}</a>`
            return self.createInline(parent, 'quoted', link)
        })
    })
}
