export default class ShortcodesParser {
    constructor(inputData, shortcodes) {
        this.inputData = inputData;
        this.shortcodes = shortcodes;
        this.parseShortcodes();
    }

    parseShortcodes() {
        // console.log(this.shortcodes);
        if (!this.inputData || !this.shortcodes) return;

        // if (!this.shortcodes.length && typeof this.shortcodes === "object") {
        //     // Loop the shortcodes object and replace the object.shortcode with object.value
        //     Object.keys(this.shortcodes).forEach(key => {
        //         this.inputData = this.inputData.replaceAll(this.shortcodes[key].shortcode, this.shortcodes[key].value);
        //     })
        //     return this.inputData;
        // };

        // If shortcodes is an array, loop the shortcodes array and replace the shortcode with the value

        this.shortcodes.forEach(shortcode => {
            // console.log(shortcode);
            this.inputData = this.inputData.replaceAll(shortcode.shortcode, shortcode.data);
        })
        return this.inputData;
    }
}