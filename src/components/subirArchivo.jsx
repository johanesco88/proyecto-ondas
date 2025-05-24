// subirArchivo.js
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseclient"; // Asegúrate de tener la configuración de Supabase

const SubirArchivo = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const subirArchivo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setUploading(true);

    const nombreArchivo = `${Date.now()}_${archivo.name}`;
    const { data, error } = await supabase.storage
      .from("avances") 
      .upload(nombreArchivo, archivo);

    if (error) {
      console.error("Error al subir archivo:", error);
      alert("No se pudo subir el archivo");
      setUploading(false);
      return;
    }

    const { data: urlData } = await supabase.storage
      .from("avances")
      .getPublicUrl(nombreArchivo);

    onUpload(urlData.publicUrl); // pasa la URL al padre
    setUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={subirArchivo} disabled={uploading} />
      {uploading && <p>Subiendo archivo...</p>}
    </div>
  );
};

export default SubirArchivo;
