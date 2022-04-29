import axios from "axios";
import alertService from "./messagingService";

export class ApiService {
    serverUrl = 'http://localhost:8089';
    enable_url_alert = false;

    getDefaultOptions = {
        successMessage: false,
        showError: true,
        axios: {}
    }

    postDefaultOptions = {
        successMessage: 'Posted successfully.',
        showError: true,
        axios: {}
    }

    putDefaultOptions = {
        successMessage: 'Updated successfully.',
        showError: true,
        axios: {}
    }

    deleteDefaultOptions = {
        successMessage: 'Deleted successfully.',
        showError: true,
        axios: {}
    }

    async get(serviceUrl, data, options) {
        if (this.enable_url_alert)
            alert(`${this.serverUrl}/${serviceUrl}`);

        const opt = {...this.getDefaultOptions, ...options};

        try {
            const resp = await axios.get(`${this.serverUrl}/${serviceUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccessMessage(opt.successMessage);
            }
            return resp.data;
        } catch (error) {
            if (opt.showError) {
                alertService.showErrorMessage(error.message);
            }
            throw error;
        }
    }

    async put(serviceUrl, data, options) {
        if (this.enable_url_alert)
            alert(`${this.serverUrl}/${serviceUrl}`);

        const opt = {
            ...this.putDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.put(`${this.serverUrl}/${serviceUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccessMessage(opt.successMessage);
            }
            return resp.data;
        } catch (error) {
            if (opt.showError) {
                alertService.showErrorMessage(error.message);
            }
            throw error;
        }
    }

    async post(serviceUrl, data, options) {
        if (this.enable_url_alert)
            alert(`${this.serverUrl}/${serviceUrl}`);

        const opt = {
            ...this.postDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.post(`${this.serverUrl}/${serviceUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccessMessage(opt.successMessage);
            }
            return resp.data;
        } catch (error) {
            if (opt.showError) {
                alertService.showErrorMessage(error.message);
            }
            throw error;
        }
    }

    async delete(serviceUrl, data, options) {
        if (this.enable_url_alert)
            alert(`${this.serverUrl}/${serviceUrl}`);

        const opt = {
            ...this.deleteDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.delete(`${this.serverUrl}/${serviceUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccessMessage(opt.successMessage);
            }
            return resp.data;
        } catch (error) {
            if (opt.showError) {
                alertService.showErrorMessage(error.message);
            }
            throw error;
        }
    }
}

const apiService = new ApiService();

export default apiService;