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
import { Badge } from '@/components/ui/badge'
import { FileUp, Play, AlertCircle, Calendar, User, FileText } from 'lucide-react'
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
    <div className="space-y-4 md:space-y-6 animate-fade-in-up p-4 md:p-0">
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Upload de Dados</CardTitle>
          <CardDescription className="text-sm">
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
              'flex flex-col items-center justify-center p-6 md:p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors touch-manipulation',
              isDragging
                ? 'border-primary bg-secondary'
                : 'border-border hover:border-primary/50',
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground" />
            <p className="mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground text-center px-2">
              {file
                ? `Arquivo selecionado: ${file.name}`
                : 'Arraste e solte ou toque para selecionar'}
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
              <AlertTitle className="text-sm">Validação</AlertTitle>
              <AlertDescription className="text-xs md:text-sm">
                Arquivo "{file.name}" pronto para validação. Clique em
                "Processar Dados" para continuar.
              </AlertDescription>
            </Alert>
          )}
          <Button disabled={!file} className="w-full sm:w-auto rounded-sm h-9 md:h-10 text-sm">
            <Play className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Processar Dados
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Histórico de Uploads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block">
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
                    <TableCell className="font-medium">{item.file}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === 'Erro' ? 'destructive' : 'default'}
                        className="rounded-sm"
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3 p-4">
            {mockHistory.map((item) => (
              <Card key={item.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <h3 className="font-semibold text-sm truncate">{item.file}</h3>
                      </div>
                    </div>
                    <Badge
                      variant={item.status === 'Erro' ? 'destructive' : 'default'}
                      className="rounded-sm text-xs ml-2 flex-shrink-0"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Usuário:</span>
                      <span className="font-medium truncate">{item.user}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataImportPage
