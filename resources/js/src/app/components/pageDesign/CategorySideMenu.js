Vue.component("category-side-menu", {

    props: [
        "template",
        "navigationTree"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    events:
    {
        "category-node-activated": function(nodeList)
        {
            this.$broadcast("update-nodes", nodeList);
        }
    }
});
