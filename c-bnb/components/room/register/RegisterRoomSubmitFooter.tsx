import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../../common/Button";
import { registerRoomAPI } from "../../../lib/api/room";
import { useSelector } from "../../../store";

const RegisterRoomSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  //* 등록하기 클릭 시
  const onClickregisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };
    try {
      await registerRoomAPI(registerRoomBody);

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button onClick={onClickregisterRoom} color="bittersweet" width="102px">
        등록하기
      </Button>
    </Container>
  );
};

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${(props) => props.theme.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

export default RegisterRoomSubmitFooter;
