(function() {

    new Vue({
        el: '#main',
        data: {
            images: [],
            title: '',
            desc: '',
            username: '',
            file: ''
        },
        created: function() {
            console.log("created");
        },
        mounted: function() {
            console.log("mounted");

            var self = this;
            axios.get('/images').then(function(response) {
                self.images = response.data;
            }).catch(function(err) {
                console.log(err);
            });
        },
        updated: function() {
            console.log("updated");
        },
        methods: {
            handleFileChange: function(e) {
                this.file = e.target.files[0];
            },
            upload: function() {
                var formData = new FormData;
                formData.append('file', this.file);
                formData.append('desc', this.desc);
                formData.append('title', this.title);
                formData.append('username', this.username);

                var me = this;
                axios.post('/upload', formData).then(function(response) {
                    me.images.unshift(response.data[0]);
                }).catch(function(err) {
                    console.log(err);
                });
            }
        }
    });

})();
