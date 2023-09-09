import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialInput {
    icon: IconDefinition
    link: string
    fontSize?: string
    color?: string
}

export function SocialLink({ icon, link, fontSize, color }: SocialInput): JSX.Element {
    return (
        <div style={{ marginInline: '0.5rem', width: 'min-content', display: 'inline-block' }}>
            <a href={link} style={{ fontSize: fontSize || '4rem', color: color || '#fff', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={icon} />
            </a>
        </div>
    )
}