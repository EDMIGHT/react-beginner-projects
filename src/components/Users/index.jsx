import React from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({
  items,
  isLoading,
  invites,
  onClickInvite,
  searchValue,
  onChangeSeacrhValue,
  onClickSendInvites,
}) => {
  const userElements = items
    .filter((item) => {
      const fullName = (item.first_name + " " + item.last_name).toLowerCase();
      return (
        fullName.includes(searchValue.toLowerCase()) ||
        item.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    .map((item) => (
      <User
        onClickInvite={onClickInvite}
        isInvited={invites.includes(item.id)}
        key={item.id}
        {...item}
      />
    ));

  const disabled = invites.length === 0;

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={searchValue}
          onChange={onChangeSeacrhValue}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">{userElements}</ul>
      )}

      <button
        className={`send-invite-btn ${disabled && "disabled"}`}
        onClick={onClickSendInvites}
        disabled={disabled}>
        Отправить приглашение
      </button>
    </>
  );
};
