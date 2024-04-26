interface IconProps
{
    styles: string;
};

export const AddPlaylist = (props : IconProps) => {
    return (
        <svg className={props.styles} role="img" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"></path>
            <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"></path>
        </svg>
    );
};

export const ThreeDots = (props : IconProps) => {
    return (
        <svg className={props.styles} role="img" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
        </svg>
    );
};

export const ListView = (props : IconProps) => {
    return (
        <svg className={props.styles} role="img" aria-hidden="true" viewBox="0 0 16 16">
            <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path>
        </svg>
    );
};