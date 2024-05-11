import {FaGithub, FaDiscord, FaWrench, FaBook} from 'react-icons/fa';
import {FaHeart, FaBookmark} from 'react-icons/fa6';
import {useRouter} from 'next/navigation';
import styled from 'styled-components';


const MARGIN = '0.75rem';
const FONT_COLOR = '#ffffff99';

const InternalLinkBox = styled.div`
    user-select: none;
    display: inline-flex;
    align-items: center;
    padding: ${MARGIN};
    border-radius: 0.25rem;
    transition: all 0.2s linear;

    &:hover {
        background-color: #2C2C2C;
    }
`;

function CommonBanner() {
	const router = useRouter();

	return <div style={{
		flexDirection: 'row',
		fontSize: '1.0rem'
	}}>
		<InternalLinkBox onClick={() => {
			router.push('/dashboard');
		}}>
			<FaWrench color={FONT_COLOR} />
			<a style={{
				color: FONT_COLOR,
				marginLeft: '4px',
				userSelect: 'none'
			}}>Dashboard</a>
		</InternalLinkBox>

		<InternalLinkBox>
			<FaBook color={FONT_COLOR} />
			<a style={{color: FONT_COLOR, marginLeft: '4px'}}>Docs</a>
		</InternalLinkBox>

		<InternalLinkBox>
			<FaGithub color={FONT_COLOR} />
			<a style={{color: FONT_COLOR, marginLeft: '4px'}}
				 href={'https://github.com/suvam0451/yin'}>Github</a>
		</InternalLinkBox>

		<InternalLinkBox>
			<FaDiscord color={FONT_COLOR} />
			<a style={{color: FONT_COLOR, marginLeft: '4px'}}
				 href={'https://discord.gg/4F8vAXRE'}>Discord</a>
		</InternalLinkBox>

		<InternalLinkBox>
			<FaHeart color={FONT_COLOR} />
			<a style={{color: FONT_COLOR, marginLeft: '4px'}}>Support</a>
		</InternalLinkBox>
	</div>;
}

export default CommonBanner;