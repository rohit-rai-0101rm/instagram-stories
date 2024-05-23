export interface User {
    id: number;
    name: string;
    profileImage: string;
    stories: string[];
}


interface StoryViewerProps {
    user: User;
    onClose: () => void;
}