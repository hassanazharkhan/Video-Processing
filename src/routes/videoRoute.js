import express from 'express';
import videoService from '../services/videoService';

class videoRouter {
    constructor() {
        this.router = express.Router();
        this.routes()
    }
    routes() {
      this.router.post('/upload-video', videoService.uploadFile , videoService.uploadFinalize);
    }
}

export default new videoRouter().router