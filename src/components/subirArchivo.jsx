import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../supabase/supabaseclient";

const SubirArchivo = ({ onUpload, reset }) => {
  const [uploading, setUploading] = useState(false);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const subirArchivo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setNombreArchivo(archivo.name);
    setUploading(true);

    const nombreUnico = `${Date.now()}_${archivo.name}`;
    const { error } = await supabase.storage
      .from("avances")
      .upload(nombreUnico, archivo);

    if (error) {
      alert("No se pudo subir el archivo");
      setUploading(false);
      return;
    }

    const { data: urlData } = await supabase.storage
      .from("avances")
      .getPublicUrl(nombreUnico);

    onUpload(urlData.publicUrl);
    setUploading(false);
  };

  useEffect(() => {
    if (reset) {
      setNombreArchivo("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }, [reset]);

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={subirArchivo}
        style={{ display: "none" }}
      />
      <button onClick={handleFileClick} className="BotonAgregar" disabled={uploading}>
        {uploading ? nombreArchivo : (nombreArchivo || "Subir archivo")}
      </button>
    </div>
  );
};

export default SubirArchivo;


