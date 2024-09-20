import axios from 'axios';
import { auth } from '../firebaseConfig';
import endpoints from './endpoints';
import { onAuthStateChanged } from 'firebase/auth';

class ApiClient {
    constructor(baseURL) {
        this.apiClient = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    async initialize() {
        await this.refreshTokens();
    }

    initializeRequestInterceptor() {
        this.apiClient.interceptors.request.use(
            async (config) => {
                if (!localStorage.getItem('refreshToken')) {
                    await this.refreshAccessToken();
                }
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    initializeResponseInterceptor() {
        this.apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        await this.refreshAccessToken();
                        return this.apiClient(originalRequest);
                    } catch (error) {
                        await this.refreshTokens();
                        return this.apiClient(originalRequest);
                    }
                }
                if (error.response.status === 403 || error.response.status === 404) {
                    window.location.href = '/404';
                }
                return Promise.reject(error);
            }
        );
    }

    setAuthTokens(accessToken, refreshToken) {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    clearAuthTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete this.apiClient.defaults.headers.common['Authorization'];
    }

    async refreshTokens() {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                try {
                    const { data } = await axios.post(`${endpoints.baseUrl}/auth/token/`, { idToken: idToken });
                    this.setAuthTokens(data.access, data.refresh);
                } catch (error) {
                    window.location.href = '/create-account';
                }
            } else {
                console.log('No user signed in');
            }
        });
        return () => unsubscribe();
    }

    async refreshAccessToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            await this.refreshTokens();
            return;
        }
        try {
            const { data } = await axios.post(`${endpoints.baseUrl}/auth/token/refresh/ `, { refresh: refreshToken });
            this.setAuthTokens(data.access);
        } catch (error) {
            await this.refreshTokens();
        }
    }

    async signOut() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                await this.apiClient.post(endpoints.auth.signOut, { refresh: refreshToken });
            } catch (error) {
                console.error('Error signing out:', error);
            }
        }
        this.clearAuthTokens();
    }

    async getAcountInfo() {
        const { data } = await this.apiClient.get(endpoints.account.accountInfo);
        return data;
    }

    async updateProfile(profile) {
        const formData = new FormData();

        for (const key in profile) {
            formData.append(key, profile[key]);
        }

        const { data } = await this.apiClient.patch(endpoints.account.updateProfile, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    }

    async getProjects(searchTerm = '') {
        const { data } = await this.apiClient.get(endpoints.project.search, {
            params: { search: searchTerm },
        });
        return data;
    }

    async createProject(projectName, projectDescription = null) {
        const project = {
            name: projectName,
        };
        if (projectDescription !== null) {
            project.description = projectDescription;
        }
        const { data } = await this.apiClient.post(endpoints.project.create, project);
        return data;
    }

    async getProjectDetail(projectId) {
        const { data } = await this.apiClient.get(`${endpoints.project.detail}${projectId}/`);
        return data;
    }

    async createIssue(title, projectId, stageId) {
        const payload = {
            title: title,
            project: projectId,
            stage: stageId,
        };
        const { data } = await this.apiClient.post(endpoints.issue.create, payload);
        return data;
    }

    async updateIssueStage(issueId, stageId) {
        const payload = {
            stage: stageId,
        };
        const { data } = await this.apiClient.patch(`${endpoints.issue.update}${issueId}/`, payload);
        return data;
    }
}

const baseURL = endpoints.baseUrl;
const apiClient = new ApiClient(baseURL);

export default apiClient;
