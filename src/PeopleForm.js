import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const PeopleForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  function handleIsimSubmit(e) {
    console.log(e);
    submitFn(e.title);
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleIsimSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Bu isim daha önce eklenmiş",
            validate: (kisi) =>
              !kisiler.includes(kisi) || "Bu isim daha önce girilmiş",
          })}
          type="text"
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
