import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FileUp, Play, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'

const mockHistory = [
  {
    id: 1,
    file: 'vendas_maio.xlsx',
    date: '2024-06-01 10:30',
    user: 'admin@altamed.com',
    status: 'Concluído',
  },
  {
    id: 2,
    file: 'produtos_novos.csv',
    date: '2024-05-28 15:00',
    user: 'admin@altamed.com',
    status: 'Concluído',
  },
  {
    id: 3,
    file: 'clientes_q2.xlsx',
    date: '2024-05-25 09:12',
    user: 'admin@altamed.com',
    status: 'Erro',
  },
]

const DataImportPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0])
  }

  const handleDragEvent = (e: DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(dragging)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Upload de Dados</CardTitle>
          <CardDescription>
            Arraste e solte um arquivo ou selecione para fazer o upload.
            Formatos aceitos: .csv, .xlsx
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => handleDragEvent(e, true)}
            onDragEnter={(e) => handleDragEvent(e, true)}
            onDragLeave={(e) => handleDragEvent(e, false)}
            className={cn(
              `flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors`,
              isDragging
                ? 'border-primary bg-secondary'
                : 'border-border hover:border-primary/50',
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              {file
                ? `Arquivo selecionado: ${file.name}`
                : 'Arraste e solte ou clique para selecionar'}
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <Alert className="rounded-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validação</AlertTitle>
              <AlertDescription>
                Arquivo "{file.name}" pronto para validação. Clique em
                "Processar Dados" para continuar.
              </AlertDescription>
            </Alert>
          )}
          <Button disabled={!file} className="w-full sm:w-auto rounded-sm">
            <Play className="mr-2 h-4 w-4" /> Processar Dados
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Histórico de Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Arquivo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell
                    className={cn(
                      item.status === 'Erro'
                        ? 'text-destructive'
                        : 'text-success',
                    )}
                  >
                    {item.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataImportPage
