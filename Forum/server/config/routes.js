const routes = require('../routes/');

module.exports = (app) => {
    app.use('/auth/', routes.authRoutes);
    app.use('/category/', routes.categoryRoutes);
    app.use('/post/', routes.postRoutes);
    app.use('/comment/', routes.commentRoutes);
    app.use('/user/', routes.userRoutes);
    app.use('/message/', routes.messageRoutes);

    app.all('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: '404 not found!'
        }); 
    });
};