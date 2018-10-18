(function() {

    Vue.component('image-modal', {
        template: '#image-modal',
        props: ['id'],
        methods: {
            close1: function() {
                this.$emit('close2');
            }
        },
        mounted: function() {
            var self = this;
            axios.get('/image-modal', {params: {id: this.id}}).then(function(response) {
                var c = response.data.results;
                var d = response.data.resp[0];
                self.url = d.url;
                self.username = d.username;
                self.title = d.title;
                self.description = d.description;
                self.created_at = d.created_at;
                self.comments = c;
            }).catch(function(err) {console.log(err)});
        },
        watch: {
            id: function() {
                //axios
            }
        },
        data: function() {
            return {
                url: '',
                username: '',
                title: '',
                description: '',
                created_at: '',
                comments: []
            }
        }
    });

    new Vue({
        el: '#main',
        data: {
            heading: 'Style this title later',
            images: [],
            imageID: location.hash.slice(1),
            title: '',
            desc: '',
            username: '',
            file: '',
            hasMore: true
        },
        mounted: function() {
            var self = this;
            axios.get('/images').then(function(response) {
                self.images = response.data;
            }).catch(function(err) {console.log(err)});

            addEventListener('hashchange', function() {
                //go to image
            })
        },
        methods: {
            handleFileChange: function(e) {
                this.fileInput = e.target;
                this.file = e.target.files[0];
            },
            getMore: function() {
                var instance = this;
                axios.get('/images/more' + this.images[this.images.length-1].id, function(response) {
                    if(!response.data.length) {
                        instance.hasMore = false;
                    }
                    [].push.apply(instance.images, response.data);
                })
            },
            upload: function() {
                var formData = new FormData;
                formData.append('file', this.file);
                formData.append('desc', this.desc);
                formData.append('title', this.title);
                formData.append('username', this.username);

                var self = this;
                axios.post('/upload', formData).then(function(response) {
                    self.images.unshift(response.data[0]);
                    self.title = '';
                    self.desc = '';
                    self.username = '';
                    self.fileInput.value = '';
                }).catch(function(err) {
                    console.log(err);
                });
            },
            openModal: function(id) {
                this.imageID = id;
            },
            close3: function() {
                this.imageID = null;
            }
        }
    });

})();
