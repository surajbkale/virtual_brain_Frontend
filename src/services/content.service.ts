import api from "./api";

export interface Content {
  id: string;
  title: string;
  link: string;
  type: string;
  tags?: string[];
  createdAt: string;
}

export const contentService = {
  async createContent(content: {
    title: string;
    type: string;
    link: string;
    content?: string;
  }) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await api.post("/api/v1/content", content, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Create content error:", error);
      // Don't remove token on content creation errors
      throw error;
    }
  },

  async getMyContent() {
    const response = await api.get("/api/v1/content", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  },

  async deleteContent(id: string) {
    return api.delete(`/api/v1/content/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  },

  async shareContent(share: boolean) {
    try {
      const response = await api.post("/api/v1/brain/share", { share });
      return response.data;
    } catch (error) {
      console.error("Share error:", error);
      throw error;
    }
  },

  async getSharedContent(hash: string) {
    try {
      const response = await api.get(`/api/v1/brain/${hash}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Get shared content error:", error);
      throw error;
    }
  },

  async updateContent(id: string, content: string) {
    try {
      const response = await api.put(
        `/api/v1/content/${id}`,
        { content },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update content error:", error);
      throw error;
    }
  },
};

export default contentService;
