import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  function myHandleSubmit(e) {
    console.log(e);
    submitFn({
      ...e,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(myHandleSubmit)}>
        <div className="form-line">
          <label className="input-label">
            {" "}
            Başlık
            <input
              type="text"
              className="input-text"
              {...register("title", {
                required: "Task başlığı yazmalısınız",
                minLength: {
                  value: 3,
                  message: "Task başlığı en az 3 karakter olmalı",
                },
              })}
            />
          </label>
          {errors.title && (
            <div className="input-error">{errors.title.message}</div>
          )}
        </div>
        <div className="form-line">
          <label htmlFor="description" className="input-label">
            {" "}
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          ></textarea>
          {errors.description && (
            <div className="input-error">{errors.description.message}</div>
          )}
        </div>
        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  {...register("people", {
                    required: "Lütfen en az 1 kişi seçiniz",
                    validate: (arr) =>
                      arr.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  })}
                  value={p}
                />
                {p}
              </label>
            ))}
          </div>
          <div className="input-error">{errors.people?.message}</div>
        </div>

        <div className="form-line">
          <button disabled={!isValid} className="submit-button" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
