import React from "react";

const contact = () => {
  return (
    <div className="my-5">
      <form
        action="https://formspree.io/f/mbjezdzr"
        method="POST"
        className="flex flex-col w-full shadow-md p-3"
      >
        <h1 className="text-center text-xl">Contact me</h1>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="name">
              Name <b className="required">*</b>
            </label>
            <input type="text" name="name" required />
          </div>
          <div className="form-col">
            <label htmlFor="email">
              Email <b className="required">*</b>
            </label>
            <input type="email" name="email" required />
          </div>
        </div>
        <label htmlFor="phone">Phone</label>
        <input type="number" name="phone" />
        <label htmlFor="message">
          Message <b className="required">*</b>
        </label>
        <textarea name="message" cols={30} rows={10}></textarea>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default contact;
