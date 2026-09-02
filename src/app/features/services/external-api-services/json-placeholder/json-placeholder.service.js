import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSON_PLACEHOLDER_CONFIG } from '@core/config/external-app.config/json-placeholder/json-placeholder.config';
let JsonPlaceholderService = class JsonPlaceholderService {
    http = inject(HttpClient);
    config = JSON_PLACEHOLDER_CONFIG;
    getAllPosts() {
        const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.POSTS}`;
        return this.http.get(url);
    }
    getPostById(id) {
        const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.POSTS}/${id}`;
        return this.http.get(url);
    }
};
JsonPlaceholderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], JsonPlaceholderService);
export { JsonPlaceholderService };
