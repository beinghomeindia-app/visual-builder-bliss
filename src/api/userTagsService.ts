import { API_BASE_URL } from './config';
import { AuthService } from './auth';

export interface UserTag {
  id: number;
  user_id: number;
  tag: string;
  preference_order: number;
  created_at: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error_code?: string;
}

export class UserTagsService {
  // Get all user tags ordered by preference
  static async getUserTags(): Promise<ApiResponse<UserTag[]>> {
    const token = AuthService.getToken();
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user-tags`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user tags:', error);
      return { success: false, message: 'Network error' };
    }
  }

  // Add a new tag
  static async addTag(tag: string): Promise<ApiResponse<UserTag>> {
    const token = AuthService.getToken();
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user-tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to add tag:', error);
      return { success: false, message: 'Network error' };
    }
  }

  // Delete a tag by id
  static async deleteTag(tagId: number): Promise<ApiResponse<null>> {
    const token = AuthService.getToken();
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user-tags/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to delete tag:', error);
      return { success: false, message: 'Network error' };
    }
  }

  // Reorder tags
  static async reorderTags(tags: string[]): Promise<ApiResponse<null>> {
    const token = AuthService.getToken();
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user-tags/reorder`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to reorder tags:', error);
      return { success: false, message: 'Network error' };
    }
  }

  // Bulk add tags (used after registration)
  static async bulkAddTags(tags: string[]): Promise<void> {
    for (const tag of tags) {
      await this.addTag(tag);
    }
  }
}
