import { unified } from "unified"
import markdown from "remark-parse"
import html from "remark-html"
import parse from "html-react-parser"

export default class MarkdownParser {
    constructor({ inputMarkdown, shortcodes }) {
        this.inputMarkdown = inputMarkdown;
        this.shortcodes = shortcodes
        this.parsedMarkdown = inputMarkdown;

        this.parseMarkdown();
        if (this.shortcodes) {
            this.replacePhoneNumbers();
            this.replaceShortcodes();
        }
    }

    parseMarkdown() {
        this.parsedMarkdown = unified().use(markdown).use(html).processSync(this.inputMarkdown).value;
    }

    replaceShortcodes() {
        // console.log(this.shortcodes);
        this.shortcodes.forEach(shortcode => {
            this.parsedMarkdown = this.parsedMarkdown.replaceAll(shortcode.shortcode, shortcode.data);
        });
    }

    replacePhoneNumbers() {
        // console.log("Replacing phone numbers");
        // console.log(this.shortcodes);
        const tel = this.shortcodes.find(item => item.shortcode === "{{ tel }}")?.data
        const phone = this.shortcodes.find(item => item.shortcode === "{{ phone }}")?.data

        // console.log({ tel, phone });

        if (!tel || !phone) return "";
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ tel-component }}", `<a href="tel:${tel}">${phone}</a>`)
    }

    parseHtml() {
        return parse(this.parsedMarkdown);
    }
}