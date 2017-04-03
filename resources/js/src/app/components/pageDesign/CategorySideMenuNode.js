var ItemListService = require("services/ItemListService");

Vue.component("category-side-menu-node", {

    props: [
        "template",
        "node",
        "nodeList",
        "url"
    ],

    data: function()
    {
        return {
            isActive: false
        };
    },

    created: function()
    {
        // update url to current node
        this.url += "/" + this.node.details[0].nameUrl;

        this.nodeList.push(this.node.id);

        this.$options.template = this.template;

        // when url of this node matches the browser pathname; the tree will be actualized
        if (this.url === window.location.pathname)
        {
            this.sendCategoryHierarchy();
        }
    },

    methods:
    {
        nodeClicked: function()
        {
            this.loadCategoryData();

            this.updatePageInformation();

            this.sendCategoryHierarchy();
        },

        /*
         * load data from category with current instances' id
         */
        loadCategoryData: function()
        {
            ItemListService.setPage(1);
            ItemListService.setFacets("");

            ItemListService.setCategoryId(this.node.id);
            ItemListService.getItemList();
        },

        /*
         * update url and h1, related to instances' category
         */
        updatePageInformation: function()
        {
            // update url
            var title = document.getElementsByTagName("title")[0].innerHTML;

            window.history.replaceState({}, title, this.url + window.location.search);

            // update category header
            document.getElementsByTagName("h1")[0].innerHTML = this.node.details[0].name;
        },

        /*
         * triggers the event 'category-node-clicked' upward to all components;
         * is used to tell CategorySideMenu that the tree must be updated
         */
        sendCategoryHierarchy: function()
        {
            this.$dispatch("category-node-activated", this.nodeList);
        }
    },

    events:
    {
        /*
         * listens to the event 'update-nodes' and forward it to all downward components;
         * used to iterate through the children nodes of current instance, to check if the category-node is active
         */
        "update-nodes": function(nodeList)
        {
            this.isActive = nodeList.indexOf(this.node.id) >= 0;

            this.$broadcast("update-nodes", nodeList);
        }
    }
});
