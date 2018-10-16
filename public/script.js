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

            axios.get('/cities').then(function(response) {
                self.cities = response.data;
            }).catch(function(err) {
                console.log(err);
            });

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
            handleClick: function(e) {
                console.log('submits ' + this.greetee);
            },
            handleMousedown: function(city) {
                console.log(city.name, city.country);
            },
            handleFileChange: function(e) {
                this.file = e.target.files[0];
            },
            upload: function(e) {
                console.log("upload called");
                var formData = new FormData;
                formData.append('file', this.file);
                formData.append('desc', this.desc);
                formData.append('title', this.title);
                formData.append('username', this.username);
                axios.post('/upload', formData);
                console.log("uploaded ended");
            }
        }
    });
    
})();
