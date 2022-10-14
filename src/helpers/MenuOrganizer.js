export class MenuOrganizer {
    constructor(rawMenuData) {
        this.parsedMenuData = {};
        this.menuData = rawMenuData;
        this.flattenArray();
        this.removeLogo();
        this.extractSubsections();
        this.extractItemsWithoutSubsection();
        this.addNavItemsToRightSection();
        this.addServicesToThirdLevel();

        // console.log({ menuData: this.menuData });
        console.log({ parsedMenuData: this.parsedMenuData });
        return this.parsedMenuData;
    }

    flattenArray() {
        this.menuData = this.menuData.map((item) => item.data);
    }

    removeLogo() {
        this.menuData = this.menuData.filter((item) => item.Parent !== "Logo");
    }

    extractSubsections() {
        const uniqueSubsections = new Set();
        this.menuData.forEach((item) => {
            if (item.SubSection) {
                uniqueSubsections.add(item.SubSection);
            }
        });
        const uniqueSubsectionsArray = Array.from(uniqueSubsections);
        uniqueSubsectionsArray.forEach((subsection) => {
            this.parsedMenuData[subsection] = []
        });
    }

    extractItemsWithoutSubsection() {
        const uniqueItemsWithoutSubsection = new Set();
        this.menuData.forEach((item) => {
            if (!item.SubSection) {
                uniqueItemsWithoutSubsection.add(item.Parent);
            }
        });
        const uniqueItemsWithoutSubsectionArray = Array.from(uniqueItemsWithoutSubsection);
        uniqueItemsWithoutSubsectionArray.forEach((item) => {
            this.parsedMenuData[item] = []
        });
    }

    addNavItemsToRightSection() {
        const parents = new Set();
        this.menuData.forEach((item) => {
            if (item.SubSection) {
                if (!parents.has(item.Parent)) {
                    this.parsedMenuData[item.SubSection].push({ item: item.Parent, children: [] });
                    parents.add(item.Parent);
                }
            } else {
                this.parsedMenuData[item.Parent].push({ item: item.Child, link: item.Permalink });
            }
        })
    }

    addServicesToThirdLevel() {
        this.menuData.forEach(item => {
            if (item.SubSection) {
                this.parsedMenuData[item.SubSection].forEach(parent => {
                    if (parent.item === item.Parent) {
                        parent.children.push({ item: item.Child, link: item.Permalink })
                    }
                })
            }
        })
    }
}