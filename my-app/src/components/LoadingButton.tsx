import styled from "@emotion/styled"
import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners"

type Color = 'gray' | 'green' | 'white';

interface Props {
    children?: string,
    color?: Color,
    loading: boolean,
    onClick: () => void
}

const override: CSSProperties = {
    position: "absolute",
    display: "block",
    margin: "0 auto",
    // borderColor: "green",
    top: "3px",
    left: "27px",
    width: "30px",
    height: "30px",
};

export default function LoadingButton({ children, color = 'white', loading, onClick }: Props) {
    return (
        <Button
            onClick={onClick}
            disabled={loading}
        >
            <ButtonLabel>
                {loading === false ? children : "조회 중.."}
            </ButtonLabel>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Button>
    )
}
const Button = styled.button`
    width: 90px;
    height: 40px;
    padding: 0 16px;
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#4fc54f' : '#E84057'};
    font-weight: bold;
    margin-top: 9px;
    border: 0px;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    &:hover {
        ${props => props.disabled ? 'none' : 'background-color: #AC2537'}
    };
    position: relative;
`

const ButtonLabel = styled.span`
    font-weight: bold;
    color: white;
`