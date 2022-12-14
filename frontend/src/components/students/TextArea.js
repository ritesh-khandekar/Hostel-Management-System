import React, { useState } from 'react'

function TextArea(props) {
  const [text, settext] = useState('');
  const handlechange = (event) => {
    settext(event.target.value)
    var s = document.getElementById('Textarea').value;
    var wl = s.toString();

    var e = wl.split(" ").length;
    if (e > 150) {
      var b = text.split(" ").splice(0, 150).join(" ");
      settext(b)
    }
  }

  return (
    <>
      <div className="col-md-12">
        <label htmlFor="inputState" className="form-label">Describe your problem in 150 words</label>
        <textarea className="form-control" name='problem' value={text} onChange={handlechange} id="Textarea" defaultValue={props.user_state.problem}></textarea>

        <p>{text.split(" ").length}/150 words</p>

      </div>
    </>
  )
}

export default TextArea